import { useRouter } from "next/router";
import Webcam from "react-webcam";
import React, { useState, useRef, useEffect } from "react";

const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    const webcamRef = React.useRef(null);
    const [imgSrcBefore, setImgSrcBefore] = React.useState(null);
    const [imgSrcAfter, setImgSrcAfter] = React.useState(null);
    const [user, setUser] = useState(null);
    const videoConstraints = {
        facingMode: { exact: "environment" },
        width: 1080,
        height: 720,
      };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if(imgSrcBefore !== null) {
            setImgSrcAfter(imageSrc)
        }else{
            setImgSrcBefore(imageSrc)
        }
    }, [webcamRef, setImgSrcBefore, setImgSrcAfter]);
    useEffect(()=>{
        console.log(slug);
        fetch("/api/merch")
        .then(resp => resp.json())
        .then(response => {
            let finded = response.find(el=>{
                return el.userId == slug
            })
            setUser(finded || {fname:"Topilmadi"});
        });
    },[slug])
    return (
        <main className="cover">
            <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="camera"
            />  
            <div className="cont">
                <div className="cont-bef imgs">
                    <p>Photo before</p>
                    {imgSrcBefore && (
                        <img
                            src={imgSrcBefore}
                        />
                    )}
                </div>
                <div className="cont-bef camerabtn">
                   <button onClick={capture} className="btn"></button> 
                </div>
                <div className="cont-bef imgs">
                    <p>Photo after</p>
                    {imgSrcAfter && (
                        <img
                            src={imgSrcAfter}
                        />
                    )}
                </div>
            </div>
            <div className="userfound">
                Foydalanuvchi: {user ? user.fname : "Qidirilmoqda"}
            </div>
        </main>
    );
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