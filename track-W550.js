// require("dotenv").config();
// const puppeteer = require("puppeteer");

// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
// const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// const POSHMARK_URL =
//   "https://poshmark.com/search?query=the%20north%20face%20550&sort_by=added_desc&department=Women&category=Jackets_%26_Coats&sub_category=Puffers&brand%5B%5D=The%20North%20Face&price%5B%5D=-50&color%5B%5D=Black&color%5B%5D=Brown&color%5B%5D=Gray&color%5B%5D=Tan&color%5B%5D=Gold&color%5B%5D=Yellow&color%5B%5D=Orange&size%5B%5D=M&size%5B%5D=S&size%5B%5D=L";

// async function sendTelegramMessage(message) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
//   console.log("📲 Sending message to Telegram:", message);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         chat_id: CHAT_ID,
//         text: message,
//         parse_mode: "Markdown",
//         disable_web_page_preview: false,
//       }),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       console.error("❌ Telegram API Error:", data);
//     } else {
//       console.log("✅ Telegram API Response:", data);
//     }
//   } catch (error) {
//     console.error("❌ Failed to send Telegram message:", error);
//   }
// }

// async function checkPoshmark() {
//   console.log("⏳ Launching Puppeteer...");
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   console.log("🌐 Navigating to Poshmark...");
//   await page.goto(POSHMARK_URL, { waitUntil: "domcontentloaded" });
//   await new Promise((resolve) => setTimeout(resolve, 5000));

//   // Scroll to load listings
//   for (let i = 0; i < 7; i++) {
//     await page.evaluate(() => window.scrollBy(0, window.innerHeight));
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   }

//   console.log("🧽 Scraping listing links...");
//   const links = await page.evaluate(() => {
//     const anchors = Array.from(document.querySelectorAll("a.tile__covershot"));
//     return anchors.map((a) => "https://poshmark.com" + a.getAttribute("href"));
//   });

//   console.log(`🔗 Found ${links.length} links`);

//   console.log("🧾 Listing URLs:");
//   console.log(links.slice(0, 2));

//   const items = [];

//   for (let i = 0; i < Math.min(links.length, 5); i++) {
//     const productPage = await browser.newPage();
//     try {
//       await productPage.goto(links[i], { waitUntil: "domcontentloaded" });
//       await new Promise((resolve) => setTimeout(resolve, 3000));

//       const item = await productPage.evaluate(() => {
//         const title = document
//           .querySelector("h1.listing__title-container")
//           ?.innerText?.trim();
//         const price = document.querySelector("p.h1")?.innerText?.trim();
//         const size = document
//           .querySelector("button.size-selector__size-option")
//           ?.innerText?.trim();
//         return { title, price, size };
//       });

//       // console.log("🧪 Scraped:", item.title, "-", item.price);

//       item.link = links[i];

//       if (item.title && item.price && item.size) {
//         items.push(item);
//       }
//     } catch (err) {
//       console.warn(`⚠️ Error loading ${links[i]}`);
//     }

//     await productPage.close();
//   }

//   console.log(`📦 Final extracted: ${items.length} items`);

//   for (let item of items) {
//     const numericPrice = parseFloat(
//       item.price.match(/\$\d+/)?.[0].replace("$", "")
//     );

//     if (
//       item.title.toLowerCase().includes("550")
//       // &&
//       // numericPrice < 50 &&
//       // ["L", "M", "S"].includes(item.size)
//     ) {
//       // console.log(`✅ Match: ${item.title} - ${numericPrice} - ${item.size}`);
//       const message = `🧥 *${item.title}*\n💰 ${numericPrice}\n📏 Size: ${item.size}\n🔗 ${item.link}`;

//       await sendTelegramMessage(message);
//     }
//   }

//   await browser.close();
// }

// checkPoshmark();
