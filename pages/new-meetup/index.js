//http://domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup(props) {
  function addMeetupHandler(formData) {
    console.log(formData)
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetup;