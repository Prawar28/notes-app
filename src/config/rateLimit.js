import rateLimit from "express-rate-limit";

// limits to 10 requests per 1 minute to a IP
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10,
    message: 'Too many requests from this IP, please try again after a while.',
});

export default limiter;