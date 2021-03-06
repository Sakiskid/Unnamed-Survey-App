import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/button";
import graphSampleImg from "../assets/graph-sample.jpg";
import './landing.css';
import { gsap } from 'gsap';

function Landing() {
    useEffect(() => {
        function beginAnimation() {
            let timeline = gsap.timeline();
            timeline.fromTo(".title",
                { scale: 0.8, x: 0, opacity: 0, },
                { scale: 1, x: 0, opacity: 1, duration: 1 })
                .fromTo("#about",
                    { scale: 0.8, x: 0, opacity: 0, },
                    { scale: 1, x: 0, opacity: 1, duration: 1 })

        }

        beginAnimation();
    })


    return (
        <section className='back-div'>
            <h1 className="title anim-fade">SurvEasy</h1>

            <p className="description anim-fade" id="about">
                Make sure you know what your target audience needs. We make it easy to create surveys and get results.
            </p>

            <section>
                <Link to='/signup' className="btn-link">
                    <Button name="Sign Up"></Button>
                </Link>
                <Link to='/signin' className="btn-link">
                    <Button name="Sign In"></Button>
                </Link>
            </section>

            <section className="description-section">
                <h3>Create Surveys</h3>
                <p>
                    It is important to know what your target market is thinking. That is why SurvEasy provides a simple
                    solution for creating and providing surveys to your intended audience. Simply fill in your questions,
                    create options and answers, and you are given a link to share your survey. Anyone with this link
                    can take your survey, and their answers are saved for you.
                </p>
            </section>

            <section className="description-section">
                <h3>Get Results</h3>
                <p>
                    Survey results are easy to see. When surveys are taken, we store and display that information for
                    you to review. Our easy to read graphs help you visualize and understand your market, allowing
                    you to meet their goals!
                </p>
                <img alt="Sample of charts and analytics." src={graphSampleImg} />
            </section>


            <p className="description" id="credits">
                Created By:
                <br /><a href="https://github.com/smundhada">Shubhangi Mundhada</a>
                <br /><a href="https://github.com/nbur4556">Nick Burt</a>
                <br /><a href="https://github.com/JesseJ713">Jesse Jackson</a>
                <br /><a href="https://github.com/Sakiskid">Tyler Smith</a>
            </p>
        </section>
    )
}

export default Landing;