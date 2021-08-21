import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>Add Meetups</title>
                <meta
                    name={props.title}
                    content={props.description}
                ></meta>
            </Head>
            <MeetupDetail
                title={props.title}
                description={props.description}
                image={props.image}
                address={props.address}
            ></MeetupDetail>
        </Fragment>
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb://127.0.0.1:27017/meetups?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups-col");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    // fetch data for a single meetup
    const client = await MongoClient.connect(
        "mongodb://127.0.0.1:27017/meetups?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups-col");
    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });
    client.close();

    console.log(selectedMeetup);

    return {
        props: {
            title: selectedMeetup.data.title,
            id: selectedMeetup._id.toString(),
            description: selectedMeetup.data.description,
            image: selectedMeetup.data.image,
            address: selectedMeetup.data.address,
        },
    };
}

export default MeetupDetails;
