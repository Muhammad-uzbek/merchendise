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
    var formdata = new FormData();
    const videoConstraints = {
        facingMode: { exact: "environment" },
        width: 1080,
        height: 720,
      };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        formdata.append("demo_image", imageSrc);
        setStep(2)
        setImgSrcBefore(imageSrc)
        upload();
    }, [webcamRef, setImgSrcBefore]);
    const capture2 = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setStep(3)
        setImgSrcAfter(imageSrc)
    }, [webcamRef, setImgSrcAfter]);
    
    const upload = async () => {
        formdata.append("demo_image", imgSrcBefore);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        await fetch("http://164.92.248.91:3096/imageserver/image", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            setErrrs(result);
          })
          .catch(error => {
            console.log(error);
            setErrrs(error);
          });
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