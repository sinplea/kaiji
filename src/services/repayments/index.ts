const redis = require('redis');
const repayments = redis.createClient();
const publisher = redis.createClient();
const subscriber = redis.createClient();

module.exports = {
    repayments,
};

// Pubsub is handled automatically

subscriber.on("subscribe", (channel, count) {

})

subscriber.on("message", function (channel, message) {
    // Update withdrawable account balance
})

