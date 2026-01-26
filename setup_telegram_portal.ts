import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Replace with your Vercel Production URL once you have it.
// For now, we use a placeholder or your current linkable URL.
const WEB_APP_URL = "https://studio-main-alpha.vercel.app";

async function setupTelegramPortal() {
    if (!BOT_TOKEN) {
        console.error("❌ TELEGRAM_BOT_TOKEN missing in .env");
        return;
    }

    console.log("🚀 Customizing the 'Addis Crown Portal' on Telegram...");

    try {
        // 1. Set the Bot's Menu Button to open the Mini App
        const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
            menu_button: {
                type: "web_app",
                text: "Addis Crown",
                web_app: {
                    url: WEB_APP_URL
                }
            }
        });

        if (response.data.ok) {
            console.log("✅ 'Addis Crown' button added to Bot menu!");
        } else {
            console.error("❌ Failed to set menu button:", response.data.description);
        }

        // 2. Set Bot Description
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription`, {
            description: "The Sovereign Legal Operating System of Ethiopia. Expert drafting, research, and consultations."
        });

        console.log("✅ Bot description updated.");

    } catch (error: any) {
        console.error("❌ Telegram API Error:", error.response?.data || error.message);
    }
}

setupTelegramPortal();
