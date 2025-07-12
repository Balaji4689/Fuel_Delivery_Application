require("events").EventEmitter.defaultMaxListeners = 20;
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;


app.use(express.json());
app.use(cors());


app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.error("MongoDB connection error:", error));


const customerRouter = require('./routes/customerRouter');
const vendorRouter = require('./routes/vendorRouter');
const firmRouter = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRouter');
const deliveryRouter = require('./routes/deliveryRouter');


app.use('/customer', customerRouter);
app.use('/vendor', vendorRouter);
app.use('/firm', firmRouter);
app.use('/product', productRoutes);
app.use('/delivery', deliveryRouter);


app.get('/', (req, res) => {
    res.send('API is running!');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
