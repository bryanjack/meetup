import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//     {
//         id: "m1",
//         title: "A First Meetup",
//         image: "https://kuduskab.go.id/packages/upload/slider/jFnBF7.jpeg",
//         address: "Some Adress 5, 123 Kudus",
//         description: "Deskripsi First Meetup",
//     },
//     {
//         id: "m2",
//         title: "A Second Meetup",
//         image: "https://kuduskab.go.id/packages/upload/slider/jFnBF7.jpeg",
//         address: "Some Adress 5, 123 Kudus",
//         description: "Deskripsi Second Meetup",
//     },
// ];

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />;
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect(
        "mongodb://127.0.0.1:27017/meetups?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups-col");
    const meetups = await meetupsCollection.find().toArray();
    // console.log(meetups);
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
}

export default HomePage;
