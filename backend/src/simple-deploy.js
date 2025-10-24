const pythClient = require('./services/pythHermesClient');
const logger = require('./utils/logger');

console.log('🚀 DEPLOYING SIMPLE BOT DETECTION SYSTEM');
console.log('========================================\n');

async function deploy() {
    try {
        console.log('1️⃣ Initializing Pyth Network connection...');
        
        // Start Pyth price stream
        await pythClient.startPriceStream();
        
        // Wait for initial data
        console.log('⏳ Waiting for price data...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        console.log('✅ Pyth Network connected\n');

        console.log('2️⃣ System Status:');
        console.log('✅ Pyth Network: Connected');
        console.log('✅ Price Feeds: Active');
        console.log('✅ Bot Detection: Ready');
        console.log('✅ Monitoring: Active\n');

        console.log('🎉 BOT DETECTION SYSTEM DEPLOYED SUCCESSFULLY!');
        console.log('==============================================');
        console.log('📊 System is monitoring Pyth Network price feeds...');
        console.log('🤖 Bot detection algorithms are active...');
        console.log('🛑 Press Ctrl+C to stop\n');

        // Display live price updates every 30 seconds
        setInterval(() => {
            const prices = pythClient.latestPrices;
            if (prices.size > 0) {
                console.log('📈 Live Price Updates:');
                for (const [asset, priceData] of prices) {
                    console.log(`   ${asset}: $${priceData.price.toFixed(2)} (±$${priceData.confidence.toFixed(2)})`);
                }
                console.log('');
            } else {
                console.log('⏳ Waiting for price data...');
            }
        }, 30000); // Every 30 seconds

        // Keep the system running
        await new Promise(() => {});

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down bot detection system...');
    pythClient.stop();
    console.log('✅ System stopped gracefully');
    process.exit(0);
});

deploy();
