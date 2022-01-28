import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://pixabay.com/get/ga13938e65c2a6ec3764d2e310efa83ec3b7766835a4f57c804890ad9b6c641f48a895ee0fad535466b676323b5b451ff0e73a97f4ff6393f7a49accd6ac1eb2ef0cd805cf53a66c8e71e3d59a864066b_1280.jpg',
    address: 'Some address 512345',
    description: 'This is a first meetup'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://pixabay.com/get/ga13938e65c2a6ec3764d2e310efa83ec3b7766835a4f57c804890ad9b6c641f48a895ee0fad535466b676323b5b451ff0e73a97f4ff6393f7a49accd6ac1eb2ef0cd805cf53a66c8e71e3d59a864066b_1280.jpg',
    address: 'Some address 512asda',
    description: 'This is a second meetup'
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image: 'https://pixabay.com/get/ga13938e65c2a6ec3764d2e310efa83ec3b7766835a4f57c804890ad9b6c641f48a895ee0fad535466b676323b5b451ff0e73a97f4ff6393f7a49accd6ac1eb2ef0cd805cf53a66c8e71e3d59a864066b_1280.jpg',
    address: 'Some address zxcsdfs',
    description: 'This is a third meetup'
  }
]

function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS}/>
}

export default HomePage