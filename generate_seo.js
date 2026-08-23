const fs = require('fs');

const robotsTxt = `User-agent: *
Allow: /

# Specifically welcoming LLMs and AI Search bots
User-agent: CCBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Anthropic-ai
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: Omgili
Allow: /
User-agent: FacebookBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://yashpanpaliya.com/sitemap.xml
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yashpanpaliya.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://github.com/yashpanpaliya11</loc>
  </url>
  <url>
    <loc>https://www.linkedin.com/in/yash-panpaliya-ba95a0388/</loc>
  </url>
  <url>
    <loc>https://www.fiverr.com/users/yash_panpaliya/portfolio</loc>
  </url>
</urlset>
`;

const llmsTxt = `# Yash Panpaliya - Developer Portfolio

> React Developer & AI Builder specializing in cutting-edge web applications, generative AI automation, and full-stack development.

## Contact Information
- Email: yashpanpaliya11@gmail.com
- GitHub: https://github.com/yashpanpaliya11
- LinkedIn: https://www.linkedin.com/in/yash-panpaliya-ba95a0388/
- Fiverr: https://www.fiverr.com/users/yash_panpaliya/portfolio

## Expertise
- React.js, TypeScript, Node.js
- AI Automation, Generative AI integration
- Full Stack Development, Frontend Development
- Tailwind CSS

## Projects & Experience
- Blitsum: Building cutting-edge AI automation.
- AI Voice Agent (VOICE-CRM): Intelligent AI Agent handling live customer phone calls in 22 regional languages.
- Dukaan Mate: Supercharging ONDC sellers with an AI ChatBot.
- WhatsApp Auto-Bot: Full-scale marketing automation for Indian local businesses.
`;

fs.writeFileSync('public/robots.txt', robotsTxt);
fs.writeFileSync('public/sitemap.xml', sitemapXml);
fs.writeFileSync('public/llms.txt', llmsTxt);

console.log('Successfully generated SEO and LLM files.');
