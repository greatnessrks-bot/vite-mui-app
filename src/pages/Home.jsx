import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
} from "@mui/material";
import { TrendingUp, MusicNote } from "@mui/icons-material";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // UK Drill Artists for slideshow
  const artists = [
    {
      name: "Central Cee",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    },
    {
      name: "Dave",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    },
    {
      name: "Tion Wayne",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    },
    {
      name: "Russ Millions",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      name: "ArrDee",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
    },
    {
      name: "Leostaytrill",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    },
  ];

  // UK Music Charts (sample data)
  const charts = [
    { position: 1, title: "Doja", artist: "Central Cee", streams: "2.5M", trend: "+12%" },
    { position: 2, title: "Sprinter", artist: "Central Cee & Dave", streams: "2.1M", trend: "+8%" },
    { position: 3, title: "Body", artist: "Tion Wayne & Russ Millions", streams: "1.9M", trend: "+15%" },
    { position: 4, title: "Flowers", artist: "ArrDee", streams: "1.7M", trend: "+5%" },
    { position: 5, title: "Come Again", artist: "Dave", streams: "1.5M", trend: "+10%" },
  ];

  // Trending Artists
  const trendingArtists = [
    { name: "Central Cee", genre: "UK Drill", followers: "8.2M", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" },
    { name: "Dave", genre: "UK Rap", followers: "6.5M", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80" },
    { name: "Tion Wayne", genre: "UK Drill", followers: "4.8M", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80" },
    { name: "ArrDee", genre: "UK Rap", followers: "3.2M", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80" },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artists.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [artists.length]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section with Slideshow */}
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          overflow: "hidden",
          mb: 6,
        }}
      >
        {/* Slideshow Images */}
        {artists.map((artist, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.9)), url(${artist.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: 800,
                  textShadow: "0 0 30px rgba(0, 120, 212, 0.5)",
                  mb: 2,
                }}
              >
                {artist.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#A1A1AA",
                  textAlign: "center",
                }}
              >
                UK Drill Scene
              </Typography>
            </Container>
          </Box>
        ))}

        {/* Slide Indicators */}
        <Box
          sx={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            zIndex: 10,
          }}
        >
          {artists.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: currentSlide === index ? 40 : 12,
                height: 12,
                borderRadius: 6,
                bgcolor: currentSlide === index ? "#0078D4" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      <Container sx={{ pb: 8 }}>
        {/* UK Music Charts Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <MusicNote sx={{ fontSize: 40, color: "#0078D4", mr: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              UK Music Charts
            </Typography>
          </Box>

          <Paper sx={{ p: 3 }}>
            {charts.map((song) => (
              <Box
                key={song.position}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 2,
                  borderBottom: song.position !== 5 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#0078D4",
                      fontWeight: 800,
                      minWidth: 40,
                    }}
                  >
                    {song.position}
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {song.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#A1A1AA" }}>
                      {song.artist}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Typography variant="body1" sx={{ color: "#A1A1AA" }}>
                    {song.streams}
                  </Typography>
                  <Chip
                    label={song.trend}
                    size="small"
                    sx={{
                      bgcolor: "rgba(16, 185, 129, 0.2)",
                      color: "#10B981",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Trending Artists Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TrendingUp sx={{ fontSize: 40, color: "#8B5CF6", mr: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Trending Artists
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {trendingArtists.map((artist, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(139, 92, 246, 0.3)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={artist.image}
                    alt={artist.name}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#A1A1AA", mb: 1 }}>
                      {artist.genre}
                    </Typography>
                    <Chip
                      label={`${artist.followers} followers`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(0, 120, 212, 0.2)",
                        color: "#0078D4",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}