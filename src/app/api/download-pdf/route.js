import { NextResponse } from 'next/server';
import { marked } from 'marked';

export async function POST(request) {
  let browser;

  try {
    const { text: fileText } = await request.json();

    if (!fileText) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // ✅ Generate full styled HTML
    const html = convertMarkdownToHTML(fileText);

    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer;
    let launchOptions = {
      headless: true,
    };

    if (isVercel) {
      const chromium = (await import('@sparticuz/chromium')).default;
      puppeteer = await import('puppeteer-core');
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        defaultViewport: { width: 1200, height: 800 }, // ✅ Set a stable viewport
      };
    } else {
      puppeteer = await import('puppeteer');
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // ✅ More robust content loading
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // ✅ Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      printBackground: true,
    });

    // ✅ Proper binary response headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// ✅ Function to convert Markdown to full HTML with embedded styles
function convertMarkdownToHTML(markdown) {
  const content = marked.parse(markdown);

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                         Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            padding: 40px;
            line-height: 1.6;
            font-size: 16px;
            color: #333;
          }
          h1, h2, h3, h4, h5, h6 {
            font-weight: bold;
            margin-top: 1.5em;
          }
          p {
            margin: 1em 0;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          pre {
            background: #f4f4f4;
            padding: 1em;
            overflow-x: auto;
          }
          code {
            font-family: monospace;
            background: #f4f4f4;
            padding: 0.2em 0.4em;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}
