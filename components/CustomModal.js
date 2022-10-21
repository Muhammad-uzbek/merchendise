import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const CustomModal = ({isOpen, closer, lengthUsers}) =>{
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null);
    const [posting , setPosting] = useState(false);
    function submitter (e) {
        setPosting(true);
        fetch("/api/merch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                username: username,
                password: password,
                userId: userId,
                id: lengthUsers,
            }),
        }).then((res) => res.json())
        .then((data) => {
            setPosting(false);
            data.result.acknowledged ? closer(false) : console.log("error");
        });
    }
    return (
        <Modal
            blur
            aria-labelledby="modal-title"
            open={isOpen}
            onClose={()=>{console.log("close"); }}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Yangi merchendiser qo'shish
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Ism"
                    onChange={(e) => {
                        setFname(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Familiya"
                    onChange={(e) => {
                        setLname(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Parol"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Username(majburiymas)"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={()=>{closer(false)}} >
                    Bekor qilish
                </Button>
                <Button auto onPress={submitter} color={"warning"}>
                    {
                        posting ?  <Loading color="#fffff" size="md" /> : "Saqlash"
                    }
                </Button>
            </Modal.Footer>
      </Modal>
    )
}