import userRoutes from "./userRoutes.js"
import landingPageRoutes from "./landingPageRoutes.js"

const setupRoutes = (app) => {
    app.use('/user', userRoutes); 
    app.use('/landingPage', landingPageRoutes); 
};

export default setupRoutes;
