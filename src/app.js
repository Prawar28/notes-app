import express from "express";
import bodyParser from "body-parser";
import notesRouter from "./notes/routes.js"
import authRouter from "./auth/routes.js";
import passport from "./config/authConfig.js";
import { searchNotes } from "./notes/controller.js";
import limiter from "./config/rateLimit.js";
import throttler from "./config/throttle.js";

const app = express();

app.get('/', (req, res) => {
    res.send('welcome home !!');
})

// --middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(limiter);
app.use(throttler);

// --routes
app.use('/api/notes', passport.authenticate('jwt', { session: false }), notesRouter);
app.use('/api/auth', authRouter);
app.get('/api/search', passport.authenticate('jwt', { session: false }), searchNotes)

const port = process.env.PORT || 3000

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

startServer();