import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        console.log(enteredMeetupData);
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "Application/Json",
            },
        });

        const data = await response.json();

        console.log(data);

        router.push("/");
    }
    return (
        <Fragment>
            <Head>
                <title>Add Meetups</title>
                <meta
                    name="description"
                    content="Add active React meetups!"
                ></meta>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />;
        </Fragment>
    );
}

export default NewMeetupPage;
