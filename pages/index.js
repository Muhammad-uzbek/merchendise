import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Navbar, Button, Link, Card, Grid, Text } from "@nextui-org/react";
export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar isCompact isBordered variant="floating" maxWidth={"sm"} shouldHideOnScroll css={{zIndex: 500, paddingBottom: 50}}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Merch
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline" activeColor={"warning"}>
            <Navbar.Link href="/" isActive color={"warning"}>Visit otchetlar</Navbar.Link>
            <Navbar.Link href="/users" color={"warning"}>Merchendiserlar</Navbar.Link>
            <Navbar.Link href="/locations" color={"warning"}>Savdo nuqtalari</Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <Grid.Container gap={2}>
        <Grid xs={4}>
          <Card variant="bordered">
            <Card.Body>
            <Card.Image
              src="https://nextui.org/images/card-example-6.jpeg"
              objectFit="cover"
              width="100%"
              height="100%"
              alt="Relaxing app background"
              onMouseEnter={console.log("touch")}
            />
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={4}>
        <Card variant="bordered">
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="bordered">
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
    </Grid.Container>
    </div>
  )
}
