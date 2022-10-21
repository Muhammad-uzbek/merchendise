import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const LocModal = ({isOpen, closer, lengthLocs}) =>{
    const [place_name, setPlace_name] = useState("");
    const [area, setArea] = useState("");
    const [merch, setMerch] = useState("");
    const [time_week, setTime_week] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [posting, setPosting] = useState(false);
    function submitter (e) {
        setPosting(true);
        fetch("/api/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                place_name: place_name,
                area: area,
                merch: merch,
                time_week: time_week,
                lat: lat,
                long: long,
                id: lengthLocs,
            }),
        }).then((res) => res.json())
        .then((data) => {
            setPosting(false);
            console.log(data);
            data.result?.acknowledged ? closer(false) : console.log("error");
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
                    Yangi lokatsiya qo'shish
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Joy nomi(Корзинка — Беруни)"
                    onChange={(e) => {
                        setPlace_name(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Area(Софийская)"
                    onChange={(e) => {
                        setArea(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Merch(Абдулла)"
                    onChange={(e) => {
                        setMerch(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Tekshiruv kuni(Dushanba CHorshanba)"
                    onChange={(e) => {
                        setTime_week(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Longtiude(41.323)"
                    onChange={(e) => {
                        setLong(e.target.value);
                    }}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Latitude(69.323)"
                    onChange={(e) => {
                        setLat(e.target.value);
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