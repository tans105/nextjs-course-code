import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
// import {useState, useEffect} from "react";
import {MongoClient} from "mongodb";
import {Fragment} from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://pixabay.com/get/g0c89ae35b743833a9c4138072b5686d29198620f08173ff8abb737e0d4ddd2a4c7e11d58adbeadcacd2f22a547b1fc56515a26652cbc2a96f3a7316356604170f29a5393824714ff76d7d7df9c57a108_1280.jpg',
//     address: 'Some address 512345',
//     description: 'This is a first meetup'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://pixabay.com/get/g0c89ae35b743833a9c4138072b5686d29198620f08173ff8abb737e0d4ddd2a4c7e11d58adbeadcacd2f22a547b1fc56515a26652cbc2a96f3a7316356604170f29a5393824714ff76d7d7df9c57a108_1280.jpg',
//     address: 'Some address 512asda',
//     description: 'This is a second meetup'
//   },
//   {
//     id: 'm3',
//     title: 'A Third Meetup',
//     image: 'https://pixabay.com/get/g0c89ae35b743833a9c4138072b5686d29198620f08173ff8abb737e0d4ddd2a4c7e11d58adbeadcacd2f22a547b1fc56515a26652cbc2a96f3a7316356604170f29a5393824714ff76d7d7df9c57a108_1280.jpg',
//     address: 'Some address zxcsdfs',
//     description: 'This is a third meetup'
//   }
// ]

function HomePage(props) {
  const {meetups} = props;

  // Now using getStaticProps instead of below code
  // const [loadMeetups, setLoadedMeetups] = useState([]);
  //
  // useEffect(() => {
  //   // make http call to fetch actual meetups
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of meetups"/>
      </Head>
      <MeetupList meetups={meetups}/>)
    </Fragment>
  )
}

/**
 * Prepare props for this page. Nextjs wait for props to load.
 * We can use this function to load data before it's rendered to the browser
 * It is executed during the build process.
 * execute any code which can be run on the server. Like connect to the database, querying, fetch data from api etc.
 **/
export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://tans105:admin123@cluster0.htrct.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  await client.close();

  /*
  Always need to return object in the format
    {
      props: {}
    };
   */
  return {
    props: {
      meetups: meetups.map(meetup => {
        const {title, address, image, description} = meetup
        return {title, address, image, description, id: meetup._id.toString()}
      })
    },
    revalidate: 10
    // used for incremental static generation.
    // It will be regenerated atleast 10sec if there are request coming on the page. It will replace the old page. We ensure the data is older than 10sec
  };
}

/**
 * It will not run during the build process unlike getStaticProps, it will run on the server after deployment
 * execute any code which can be run on the server. Like connect to the database, querying, fetch data from api etc.
 * The code always run on the server
 * We get request and response object from context
 * Use this function if there is data the changes very frequently. Else better to use getStaticProps
 * @returns {Promise<void>}
 */
// export async function getServerSideProps(context) {
//   const {req, res} = context;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }


export default HomePage