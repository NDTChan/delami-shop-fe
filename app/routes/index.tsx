import { Carousel } from "@mantine/carousel";
import {
  Image,
  createStyles,
  getStylesRef,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    transition: "width 250ms ease",
    backgroundColor: "#fff",
    "&[data-active]": {
      width: rem(16),
      backgroundColor: theme.colorScheme === "dark" ? "#1A1B1E" : "#f15b67"
    },
  },
}));

export default function Index() {
  const data = [
    {
      image:
        "https://res.cloudinary.com/ddfgpn3xd/image/upload/v1678855045/delami/banner/16651678629366_uxonjr.jpg",
      title: "Best forests to visit in North America",
      category: "nature",
    },
    {
      image:
        "https://res.cloudinary.com/ddfgpn3xd/image/upload/v1678855044/delami/banner/16631678330689_ifowx8.png",
      title: "Hawaii beaches review: better than you think",
      category: "beach",
    },
    {
      image:
        "https://res.cloudinary.com/ddfgpn3xd/image/upload/v1678855044/delami/banner/16691678347779_i8ag2c.png",
      title: "Mountains at night: 12 best locations to enjoy the view",
      category: "nature",
    },
    {
      image:
        "https://res.cloudinary.com/ddfgpn3xd/image/upload/v1678855043/delami/banner/16671678345847_c2n4kw.png",
      title: "Aurora in Norway: when to visit for best experience",
      category: "nature",
    },
    {
      image:
        "https://res.cloudinary.com/ddfgpn3xd/image/upload/v1678855042/delami/banner/16611678330452_jgmt4s.png",
      title: "Best places to visit this winter",
      category: "tourism",
    },
  ];
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Image src={item.image} />
    </Carousel.Slide>
  ));
  const { classes } = useStyles();

  return (
    <Carousel
      align="start"
      withIndicators
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
      controlSize={mobile ? 20 : 40}
      nextControlIcon={<IconChevronRight size={mobile ? 20 : 40} />}
      previousControlIcon={<IconChevronLeft size={mobile ? 20 : 40} />}
    >
      {slides}
    </Carousel>
  );
}
