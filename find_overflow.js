const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set to mobile dimensions
    await page.setViewport({ width: 375, height: 667, isMobile: true });
    
    // URL of the local dev server
    await page.goto('http://localhost:3000');
    // Wait for a bit for React to render
    await new Promise(r => setTimeout(r, 2000));
    
    const elementsOverflowing = await page.evaluate(() => {
        const bodyWidth = document.body.clientWidth;
        const overflowing = [];
        
        document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            // We ignore elements that have overflow:hidden or are fixed
            // But we care if rect.right is greater than bodyWidth
            if (rect.right > bodyWidth && rect.width > 0 && rect.height > 0) {
                // To filter out parents that are just inheriting the overflow,
                // we'll fetch the ones causing it. But we just grab everything first.
                // We'll record their classList and tag
                overflowing.push({
                    tag: el.tagName,
                    className: el.className,
                    width: rect.width,
                    right: rect.right,
                    textContent: el.textContent.substring(0, 30) // sample text
                });
            }
        });
        return { bodyWidth, documentWidth: document.documentElement.scrollWidth, overflowing };
    });

    console.log(`Body width: ${elementsOverflowing.bodyWidth}`);
    console.log(`Document scroll width: ${elementsOverflowing.documentWidth}`);
    console.log(`Elements breaking bounds:`);
    
    // Show only the "leaf" most elements that overflow, or all of them
    // Sorting by width (smallest first typically meaning the child that actually caused it)
    elementsOverflowing.overflowing.sort((a,b) => a.width - b.width);
    
    elementsOverflowing.overflowing.forEach(el => {
        console.log(`- <${el.tag} class="${el.className}">: right=${el.right} (text: ${el.textContent})`);
    });
    
    await browser.close();
})();
