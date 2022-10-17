import { useRouter } from "next/router";
import Webcam from "react-webcam";
import React, { useState, useRef } from "react";
const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
    return (
        <>
            <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo {slug}</button>
            {imgSrc && (
            <img
                src={imgSrc}
            />
            )}
        </>
    );
}
  
export default Post
// export async function getStaticPaths() {
//     return {
//         paths: {
//             params: {
//                 1
//             },
//         },
//         fallback: true
//     };
// }