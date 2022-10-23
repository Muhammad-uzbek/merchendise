import { Table, Row, Col, Input, Checkbox, Tooltip, User, Text, Button, Modal, Navbar, Link  } from "@nextui-org/react";
import { StyledBadge } from "../components/StyledBadge.js";
import { IconButton } from "../components/IconButton.js";
import { EditIcon } from "../components/EditIcon.js";
import { CustomModal }    from "../components/CustomModal.js";
import { useEffect, useState
 } from "react";

export default function App() {
    const [users, setUsers] = useState([{
        fname: "Muhammad",
        lname: "Abduraxmanov",
        password: "12365",
        username: "javascriptist",
        userId: 702213093,
        id: 1,
    }]);
    const [openmodal, setOpenmodal] = useState(null);
    const [lengthUsers, setLengthUsers] = useState(0);
  const columns = [
    { name: "Ism", uid: "fname" },
    { name: "Username & ID", uid: "username" },
    { name: "Parol", uid: "password" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const opencloseHandler = (val) => {
     console.log(val);
     setOpenmodal(val);
    };
  useEffect(() => {
    fetch("/api/clients")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            setLengthUsers(data.length);
        });
    }, []);
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "fname":
        return (
          <User squared src={"https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"} name={cellValue} css={{ p: 0 }}>
            {user.lname}
          </User>
        );
      case "username":
        return (
          <Col>
            <Row>
              <Text b size={14}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.userId}
              </Text>
            </Row>
          </Col>
        );
      case "password":
        return <StyledBadge type={"active"}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", user.id)}>
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
        <Navbar isCompact isBordered variant="floating" maxWidth={"sm"} css={{zIndex: 500, paddingBottom: 50}}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Merch
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline" activeColor={"warning"}>
          <Navbar.Link href="/" color={"warning"}>Visit otchetlar</Navbar.Link>
          <Navbar.Link isActive href="/users" color={"warning"}>Merchendiserlar</Navbar.Link>
          <Navbar.Link href="/locations" color={"warning"}>Savdo nuqtalari</Navbar.Link>
        </Navbar.Content>
      </Navbar>
        <Button color="#A66908" shadow bordered rounded onPress={() => opencloseHandler(true)}>
          Qoshish
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
        <Table.Body items={users}>
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
            <CustomModal isOpen={openmodal} closer={opencloseHandler} lengthUsers={lengthUsers}/>
        </div>
    </div>
  );
}
