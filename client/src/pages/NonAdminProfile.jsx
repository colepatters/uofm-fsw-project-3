import Card from 'react-bootstrap/Card';
// import profile from '../../data/profile';
// import remi from "../../public/assets/remi.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';

const NonAdminProfile = () => {
    // const { loading, data } = useQuery(QUERY_ME);
    // Query a user and pass the user's ID from the url params

    // const profile = data?.me.pets || {};
    // console.log(profile);
    // if (loading) {
    //     return <div>Loading...</div>
    // }
    const { id } = useParams();
    console.log(id);

    // Query a user and pass the user's ID from the url params

    return (

        <div className="profile">
            {Auth.loggedIn() ? (
                <>
            <h2>NonAdminProfile</h2>
            <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src={profile.photoUrl} /> */}
            </Card>
            <div className="profileContent">
            {/* {profile.map((profile) => (
                <div className="post individualpostborder" key={profile._id}>
                        <div className="postbox align-items-center">
                            <div className="talk-bubble tri-right left-in round talk-bubble-border">
                                <div className="talktext">
                                    <h3>My name is: {profile.petName}</h3>
                                    <p>I am {profile.age} years old {profile.gender}!</p>
                                    <p>My breed is: {profile.breed}</p>
                                    <p>I have {profile.energyLevel} energy!</p>
                                    <p>I was adopted on {profile.gotchaDate}!</p>
                                    <p>I am {profile.size} in size!</p>
                                    <p>Altered: {profile.altered}</p>


                                </div>
                            </div>
                        </div>
                    
                </div>
            ))} */}
        </div>
        </>
            ) : (
                <h2>You need to be logged in to see the feed.</h2>
            )}
        </div>
    );
}

export default NonAdminProfile;



