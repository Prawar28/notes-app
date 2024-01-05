import throttle from "express-throttle";

// allow max of 10 requests per second
const throttler = throttle({
    rate: "10/s",
    ip: true,
});

export default throttler;