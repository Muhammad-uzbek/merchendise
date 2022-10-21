import { Table, Row, Col, Input, Checkbox, Tooltip, User, Text, Button, Navbar } from "@nextui-org/react";
import { StyledBadge } from "../components/StyledBadge.js";
import { IconButton } from "../components/IconButton.js";
import { EditIcon } from "../components/EditIcon.js";
import { LocModal }    from "../components/LocModal.js";
import { useEffect, useState
 } from "react";

export default function App() {
    const [locs, setLocs] = useState([{
        place_name: "Корзинка — Олтинтепа",
        area: "Яшнобод центр",
        time_week: "Сешенба шанба",
        merchant: "Aziza",
        lat: 41.24087249379467,
        long: 69.33393945258803,
        id: 1,
    }]);
    const [openmodal, setOpenmodal] = useState(null);
    const [lengthLocs, setLengthLocs] = useState(0);
  const columns = [
    { name: "ID", uid: "id" },
    { name: "Do'kon", uid: "place_name" },
    { name: "Merchent & Ish kuni", uid: "merchant" },
    { name: "Long & lat", uid: "lat" },
    { name: "Tahrirlash", uid: "actions" },
  ];
  const opencloseHandler = (val) => {
     console.log(val);
     setOpenmodal(val);
    };
    const ifKorzinka = (val) => {
        if (val.startsWith("Корзинка") || val.startsWith("Kорзинка ")) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlQZPj9lCewsoUsGdLIGZCzTo-_DT_gWk0TQ&usqp=CAU"
        }
        else if(val.startsWith("Smart")) {
            return "https://api.callumida.uz/images/8m9k20rdEqUzZ9gJFSNUEO5mPlNe2IPFH2O3Jq3j.png"
        } 
        else {
            return "https://static.vecteezy.com/system/resources/thumbnails/004/705/198/small/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";
        }
    }
    const keyByLong = (val) => {
        //get last 5 digits of long
        return Number(val.toString().slice(-5));
    }
    const random5digit = () => {
        return Math.floor(10000 + Math.random() * 90000);
    }
  useEffect(() => {
    fetch("/api/locations")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setLocs(data.reverse());
            setLengthLocs(data.length);
        });
    }, []);
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
        case "id":
            return <Text>{cellValue+1}</Text>;
      case "place_name":
        return (
          <User squared  name={cellValue} src={ifKorzinka(cellValue)} css={{ p: 0 }}>
            {user.area}
          </User>
        );
      case "merchant":
        return (
          <Col>
            <Row>
              <Text b size={14}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.time_week}
              </Text>
            </Row>
          </Col>
        );
      case "lat":
        return <StyledBadge type={"active"}>{cellValue +" "+user.long}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", random5digit())}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            {/* <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col> */}
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div className="users-cont">
        <Navbar isCompact isBordered variant="floating" maxWidth={"sm"} shouldHideOnScroll css={{zIndex: 500, paddingBottom: 50}}>
          <Navbar.Brand>
            <Text b color="inherit" hideIn="xs">
              Merch
            </Text>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="underline" activeColor={"warning"}>
            <Navbar.Content hideIn="xs" variant="underline" activeColor={"warning"}>
            <Navbar.Link href="/" color={"warning"}>Visit otchetlar</Navbar.Link>
            <Navbar.Link href="/users" color={"warning"}>Merchendiserlar</Navbar.Link>
            <Navbar.Link href="/locations" isActive color={"warning"}>Savdo nuqtalari</Navbar.Link>
          </Navbar.Content>
          </Navbar.Content>
        </Navbar>
        <Button color="#A66908" shadow bordered rounded onPress={() => opencloseHandler(true)}>
          Qo'shish
        </Button>
        <Table
        aria-label="Example table with custom cells"
        css={{
            height: "auto",
            minWidth: "100%",
        }}  
        selectionMode="none"
        warning
        >
        <Table.Header columns={columns}>
            {(column) => (
            <Table.Column
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
            >
                {column.name}
            </Table.Column>
            )}
        </Table.Header>
        <Table.Body items={locs}>
            {(item) => (
            <Table.Row>
                {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
            </Table.Row>
            )}
        </Table.Body>
        </Table>
        <div>   
            <LocModal isOpen={openmodal} closer={opencloseHandler} lengthLocs={lengthLocs} />
        </div>
    </div>
  );
}