import { useRouter } from "next/router";
import Webcam from "react-webcam";
import React, { useState, useRef, useEffect } from "react";
const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const [user, setUser] = useState(null);
    const videoConstraints = {
        facingMode: { exact: "environment" },
        width: 1080,
        height: 1920,
      };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    useEffect(()=>{
        fetch("/api/merch")
        .then(resp => resp.json())
        .then(response => {
            response.map(item =>{
                if(slug == item.userId) setUser(item)
            })
        });
    },[])
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
                    {imgSrc && (
                        <img
                            src={imgSrc}
                        />
                    )}
                </div>
                <div className="cont-bef camerabtn">
                   <button onClick={capture} className="btn"></button> 
                </div>
                <div className="cont-bef imgs">
                    <p>Photo after</p>
                    {imgSrc && (
                        <img
                            src={imgSrc}
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