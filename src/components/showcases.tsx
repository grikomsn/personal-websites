import { Link } from "@/components";
import { useColorMode } from "@/hooks";
import { Showcase } from "@/types";
import { Box, Grid, Heading, Stack } from "@chakra-ui/core";
import { motion } from "framer-motion";
import * as React from "react";
import { Image as DatoImage } from "react-datocms";

const MotionBox = motion.custom(Box);

type ShowcasesProps = {
  showcases: Showcase[];
  slice?: number;
  full?: boolean;
};

const Showcases: React.FC<ShowcasesProps> = ({ showcases, slice, full }) => {
  const { isDarkMode } = useColorMode();

  const maxHeights = {
    default: "96px",
    lg: full ? "384px" : "192px",
  };

  const sliced = slice > 0 ? showcases.slice(0, slice) : showcases;

  return (
    <Box>
      <Grid
        gap={4}
        templateColumns={{
          default: "repeat(1, 1fr)",
          sm: full ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
        }}
      >
        {sliced.map(({ title, tech, image, url }, i) => (
          <Box
            key={i}
            backgroundColor={isDarkMode ? "gray.600" : "gray.100"}
            borderRadius={2}
            color="inherit"
            p={4}
            pb={0}
            textAlign="center"
          >
            <Stack h="full">
              <Stack flexGrow={1} spacing={full ? 4 : 2}>
                <Link href={url} isExternal>
                  <Heading
                    as={full ? "h2" : "h3"}
                    fontWeight={full ? "bold" : "semibold"}
                    size={full ? "lg" : "md"}
                  >
                    {title}
                  </Heading>
                </Link>

                <Box fontSize={full ? "md" : "sm"}>{tech}</Box>
              </Stack>

              <Link href={url} isExternal>
                <Box maxHeight={maxHeights} overflowY="hidden">
                  <MotionBox animate initial={{ y: 0 }} whileHover={{ y: -8 }}>
                    <DatoImage data={image.responsiveImage} lazyLoad={false} />
                  </MotionBox>
                </Box>
              </Link>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

Showcases.defaultProps = {
  slice: 0,
  full: false,
};

export default Showcases;