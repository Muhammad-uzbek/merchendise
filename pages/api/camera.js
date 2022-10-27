export default async function handler(req, res) {
    // get demo_image from request body
    console.log(req.body);
    const { demo_image } = req.body;
    // create buffer from base64 encoded string
    const buffer = Buffer.from(demo_image.replace(/^data:image\/\w+;base64,/, ""),'base64');
    // create unique name for image
    const imageName = `${Date.now()}.png`;
    // post image to server
    
    const result = await fetch(`http://164.92.248.91:3096/imageserver/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            demo_image: buffer
        })
    });
    console.log(result);
    // return image result
    res.status(200).json(result);
}
