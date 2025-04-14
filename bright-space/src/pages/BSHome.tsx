import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import BSBanner from "../components/BSBanner";
import BSNavLink from "../components/BSLinks/BSNavLink";
import ResourceImage from "../assets/images/home/Resource.png";
import PostingCoachImage from "../assets/images/home/Coach.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "3rem 1rem",
  },
  slide: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "480px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",

    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  textSection: {
    flex: 1,
    padding: "4rem 3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 2,

    "@media (max-width: 900px)": {
      textAlign: "center",
      padding: "2rem 1.5rem",
    },
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: "1.3",
    marginBottom: "1.5rem",
    color: "#2d2d2d",
    wordBreak: "break-word",
  },
  description: {
    fontSize: "1.125rem",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#7B5EFF",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",

    ":hover": {
      backgroundColor: "#1749cc",
    },
  },
  imageSection: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",

    "@media (max-width: 900px)": {
      clipPath: "none",
      height: "260px",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1.05)",
  },
  intro: {
    padding: "5rem 2rem 4rem",
    maxWidth: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: "#1c1c1c",
  },
  introTitle: {
    fontSize: "2.25rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
  },
  introParagraph: {
    fontSize: "1.125rem",
    lineHeight: "1.8",
    marginBottom: "1.5rem",
    color: "#4b4b4b",
  },
});

const BSHome = () => {
  const styles = useStyles();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BSBanner onExploreClick={handleExploreClick} />

      <div className={styles.intro}>
        <h2 className={styles.introTitle}>BrightSpace’s Mission</h2>
        <p className={styles.introParagraph}>
          In today’s digital age, cyberbullying has become an all-too-common experience among teens. Many suffer silently, unsure how to respond or where to turn for help. BrightSpace empowers young people and their families with interactive tools, practical scenarios, and communication guides to build empathy, confidence, and safety online. Together, we’re creating a more positive, respectful, and supportive digital world — one choice, one conversation, one action at a time.
        </p>

      </div>

      <div ref={sectionRef} className={styles.wrapper}>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className={styles.slide}>
              <div className={styles.textSection}>
                <h2 className={styles.title}>Digital Citizenship Scenario and Guides</h2>
                <p className={styles.description}>
                  Experience common online challenges, choose how to respond, and build real-life skills for digital wellbeing.
                </p>
                <button
                  className={styles.button}
                  onClick={() => (window.location.href = "/bs-resource")}
                >
                  Learn More about the resources
                </button>
              </div>
              <div className={styles.imageSection}>
                <img src={ResourceImage} className={styles.image} alt="Resource" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.slide}>
              <div className={styles.textSection}>
                <h2 className={styles.title}>Intentional Posting Coach</h2>
                <p className={styles.description}>
                  The Posting Coach helps teens navigate the complexities of online communication,
                  offering guidance on kind and respectful expression.
                </p>
                <button
                  className={styles.button}
                  onClick={() => (window.location.href = "/bs-posting-coach")}
                >
                  Try the Posting Coach
                </button>
              </div>
              <div className={styles.imageSection}>
                <img src={PostingCoachImage} className={styles.image} alt="Posting Coach" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default BSHome;