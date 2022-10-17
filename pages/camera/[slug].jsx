import { useRouter } from "next/router";
import Webcam from "react-webcam";
import React, { useState, useRef } from "react";
const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const videoConstraints = {
        facingMode: { exact: "environment" },
        width: 1280,
        height: 720,
      };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
    return (
        <main className="cover">
            <div className="camera">

            </div>
            <div className="cont">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />     
                
                <div className="cont-bef">
                    <p>Photo before</p>
                    {imgSrc && (
                        <img
                            src={imgSrc}
                        />
                    )}
                </div>
                <div className="cont-bef">
                   <button onClick={capture} className="btn"></button> 
                </div>
                <div className="cont-bef">
                    <p>Photo after</p>
                    {imgSrc && (
                        <img
                            src={imgSrc}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
const styles = {
    btn:{
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        boxShadow: '0px 0px 0px 6px rgba(237,237,237,0.5)',
    },
    cover:{
        backgroundColor: 'black',
        height:'100vh',
        disylay: 'flex',
        justifyContent: 'center',
        flexDirection: 'column', 
    }
}
export default Post;

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