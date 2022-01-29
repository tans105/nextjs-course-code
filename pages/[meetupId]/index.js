import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  const {meetup} = props
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

  return {
    props: {
      meetup: {
        id: meetupId,
        title: 'A First Meetup',
        image: 'https://pixabay.com/get/g0c89ae35b743833a9c4138072b5686d29198620f08173ff8abb737e0d4ddd2a4c7e11d58adbeadcacd2f22a547b1fc56515a26652cbc2a96f3a7316356604170f29a5393824714ff76d7d7df9c57a108_1280.jpg',
        address: 'Some address 512345',
        description: 'This is a first meetup'
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
  // Here we specify all the possible meetupId
  return {
    fallback: false,
    //key tells nextjs if we provided all supported values. If user enteres anything that is not supported it takes us to /404
    //fallback help to generate some pages which we know can be possible
    //fallback : false => We have provided all values
    //fallback : true => There can be other possibility other than specified
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      },
      {
        params: {
          meetupId: 'm3'
        }
      }
    ]
  }
}

export default MeetupDetails;