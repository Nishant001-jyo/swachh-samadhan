import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image, description, fileName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `You are an AI civic issue detection system for Indian cities. Analyze the uploaded image and identify civic/infrastructure problems.

You MUST respond with a JSON object using this EXACT tool call. Analyze the image carefully for:
- Potholes, road cracks, road damage
- Garbage piles, illegal dumping, waste
- Water leakage, flooding, pipe bursts
- Broken/non-functional streetlights
- Open manholes, broken footpaths
- Any other civic infrastructure issue

Base severity on danger level:
- critical: life-threatening (open manholes, severe road damage)
- high: significant daily impact (large potholes, major garbage dumps)
- medium: moderate inconvenience (minor road cracks, small waste)
- low: minor cosmetic issues

Base priority on:
- URGENT: critical severity, immediate danger
- HIGH: high severity, daily impact
- MEDIUM: medium severity
- LOW: low severity

Map to departments:
- Road damage/potholes → "Roads & Highways Department"
- Garbage/waste → "Municipal Sanitation Department"  
- Water issues → "Water Supply Board"
- Streetlights → "Electricity Board"
- Manholes/drainage → "Municipal Corporation – Drainage"
- Other → "Municipal Corporation – General"`;

    const userMessage = description 
      ? `Analyze this image of a civic issue. Additional context: "${description}". File: ${fileName}`
      : `Analyze this image of a civic issue. File: ${fileName}`;

    const messages: any[] = [
      { role: "system", content: systemPrompt },
      { 
        role: "user", 
        content: [
          { type: "text", text: userMessage },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } }
        ]
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        tools: [{
          type: "function",
          function: {
            name: "report_civic_issue",
            description: "Report the detected civic issue with all analysis details",
            parameters: {
              type: "object",
              properties: {
                problemType: { type: "string", description: "Short descriptive name like 'Severe Pothole Detected' or 'Illegal Garbage Dumping'" },
                severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
                confidence: { type: "number", description: "Confidence percentage 0-100" },
                priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "URGENT"] },
                department: { type: "string", description: "Government department to route to" },
                description: { type: "string", description: "Detailed 1-2 sentence description of the issue" }
              },
              required: ["problemType", "severity", "confidence", "priority", "department", "description"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "report_civic_issue" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("No tool call in response");
  } catch (e) {
    console.error("analyze-issue error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
