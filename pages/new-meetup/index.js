//http://domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";

function NewMeetup(props) {
  const router = useRouter();
  async function addMeetupHandler(formData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    await router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetup;