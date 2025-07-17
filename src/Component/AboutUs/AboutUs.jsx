import React from "react";
import './aboutUs.css'

const AboutUs = () => {
  return (
    <div>
      <section className="about-us">
        <p>
          The <strong>Dispensary Management System</strong> at{" "}
          <strong>Haldia Institute of Technology</strong> is a comprehensive
          web-based platform created to enhance the delivery and administration
          of medical services within the campus. Developed as a student-driven
          initiative, this system is a step toward digital transformation in
          institutional healthcare.
        </p>

        <p>
          Our platform is designed to simplify and centralize the day-to-day
          operations of the campus dispensary. It enables real-time management
          of patient records, staff scheduling, medicine stock tracking, and
          appointment booking — all through a user-friendly interface. By
          minimizing paperwork and automating key tasks, the system ensures
          timely, accurate, and organized healthcare support for the entire HIT
          community.
        </p>

        <p>
          With data security and efficiency at its core, the system empowers
          medical staff to focus more on patient care and less on administrative
          burdens. Students and faculty can easily access their medical
          histories, request consultations, and receive notifications, making
          the entire process more transparent and responsive.
        </p>

        <p>
          This system reflects the institute’s vision of embracing smart
          technologies to improve essential services and uphold the well-being
          of its students and staff. It not only improves internal processes but
          also builds a foundation for scalable healthcare innovation on campus.
        </p>

        <div className="timing">
          <h5 className="Heading">Dispensary Operating Hours</h5>
          <ul>
            <li>
              <strong>Monday to Saturday:</strong> 9:00 AM – 5:00 PM
            </li>
            <li>
              <strong>Sunday:</strong> Closed
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
