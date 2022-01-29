import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";

function MeetupDetails(props) {
  const {meetup} = props;
  return <MeetupDetail image={meetup.image} title={meetup.title} address={meetup.address}
                       description={meetup.description}/>
}

/**
 * The page is pregenerated during the build proces
 * @param context
 * @returns {Promise<{props: {meetup: {image: string, address: string, description: string, id, title: string}}}>}
 */
export async function getStaticProps(context) {
  // fetch data for a single meetup

  const {params} = context;
  const {meetupId} = params;

  const client = await MongoClient.connect('mongodb+srv://tans105:admin123@cluster0.htrct.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
  console.log(selectedMeetup);
  await client.close();
  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}

/**
 * Nextjs needs to know for which id the page has to be generated. That's why we need getStaticPaths function
 * Use this function is mandatory when
 * - getStaticProps
 * - its a dynamic page function
 *
 * It also follows a return template
 * We can generate the template array dynamically.
 * @returns {Promise<void>}
 */
export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://tans105:admin123@cluster0.htrct.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray(); // find all collections and extract only _id field
  await client.close();

  // Here we specify all the possible meetupId
  return {
    fallback: false,
    //key tells nextjs if we provided all supported values. If user enteres anything that is not supported it takes us to /404
    //fallback help to generate some pages which we know can be possible
    //fallback : false => We have provided all values
    //fallback : true => There can be other possibility other than specified
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
  }
}

export default MeetupDetails;