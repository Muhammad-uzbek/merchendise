import { useRouter } from "next/router";
import Webcam from "react-webcam";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import FormData from 'form-data';

const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    const webcamRef = React.useRef(null);
    const [imgSrcBefore, setImgSrcBefore] = React.useState(null);
    const [errrs, setErrrs] = React.useState(null);
    const [imgSrcAfter, setImgSrcAfter] = React.useState(null);
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);
    
    const videoConstraints = {
        facingMode: { exact: "environment" },
        width: 1080,
        height: 720,
      };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrcBefore(imageSrc);
        let fileOfImage = new File([imageSrc], "image.png", {
            type: "image/png",
        });
        const formData = new FormData();
        formData.append("demo_image", fileOfImage);
        formData.append("slug", slug);
        setStep(2);
        fetch("/api/camera", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // try {
        //     const response = axios.post(
        //         "/api/camera",
        //         formdata,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     setErrrs(response.data);
        // } catch (error) {
        //     setErrrs(error.response.data);
        // }
    }, [webcamRef, setImgSrcBefore]);
    const capture2 = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setStep(3)
        setImgSrcAfter(imageSrc)
    }, [webcamRef, setImgSrcAfter]);
    
    const upload = async () => {
        // upload base64 image to server with axios
        try {
            const response = await axios.post(
                "/api/camera",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setErrrs(response.data);
        } catch (error) {
            setErrrs(error.response.data);
        }
    }

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
            <div className="errs">
                {
                    errrs && (
                        <p>
                            {JSON.stringify(errrs)}
                        </p>
                    )
                }
            </div>
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
                    {
                        step == 3 ? <button onClick={upload}>Upload</button> : <button onClick={step == 2 ? capture2 : capture} className="btn">{step}</button> 

                    }
                   
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