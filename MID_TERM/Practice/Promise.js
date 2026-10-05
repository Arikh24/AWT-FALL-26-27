function processOrder()
{
    return new Promise((resolve,reject) =>
    {
        console.log ("Promise Started ...");
        setTimeout(() =>
        {
            const success =true;
            if (success)
            {
                resolve
                (
                    {
                        ordrtID :42017,
                        customer : "Arikh",
                        item : "Chicken Burger",
                        quantity : 2,
                        total : 500,
                    }
                );
            }
            else
            {
                reject("Failed to Process to order.");
            }
        },2000);
    });
    
};
processOrder()
.then ((order) =>
{
    console.log ("OrderId :", order.orderId);
    console.log ("Customer name : ",order.name );
    console.log ("Item :", order.item);
    console.log ("Quantity :", order.quantity);
    console.log ("Total : ", order.total);
    console.log ("Order Processing Complete");
}
)
.catch((error) =>
{
    console.log("Error",error);
}
)