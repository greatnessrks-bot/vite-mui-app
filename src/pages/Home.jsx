import { useState, useEffect } from "react"
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
  Stack,
} from "@mui/material"
import { TrendingUp, MusicNote } from "@mui/icons-material"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const artists = [
    { name: "Central Cee", image: "./images/centralcee.jpg" },
    { name: "Dave", image: "./images/dave.webp" },
    { name: "Tion Wayne", image: "./images/tionwayne.webp" },
    { name: "Russ Millions", image: "./images/russmillions.webp" },
    { name: "ArrDee", image: "./images/arrdee.jpg" },
    { name: "Leostaytrill", image: "./images/leostaytrill.jpg" },
  ]

  const charts = [
    { position: 1, title: "No Introduction", artist: "Central Cee", streams: "37.4M", trend: "+12%" },
    { position: 2, title: "Sprinter", artist: "Central Cee & Dave", streams: "958M", trend: "+8%" },
    { position: 3, title: "Body", artist: "Tion Wayne & Russ Millions", streams: "358M", trend: "+15%" },
    { position: 4, title: "Come & Go", artist: "ArrDee", streams: "5.17M", trend: "+5%" },
    { position: 5, title: "Come Again", artist: "Dave", streams: "1.5M", trend: "+10%" },
  ]

  const trendingArtists = [
    { name: "Central Cee", genre: "UK Drill", followers: "8.2M", image: "./images/centralcee.jpg" },
    { name: "Dave", genre: "UK Rap", followers: "6.5M", image: "./images/dave.webp" },
    { name: "Tion Wayne", genre: "UK Drill", followers: "4.8M", image: "./images/tionwayne.webp" },
    { name: "LeoStayTrill", genre: "UK Rap", followers: "3.2M", image: "./images/leostaytrill.jpg" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artists.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [artists.length])

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#1A1A2E", color: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "50vh", sm: "60vh", md: "70vh" },
          overflow: "hidden",
          mb: { xs: 4, md: 6 },
        }}
      >
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
              px: 2,
            }}
          >
            <Container maxWidth="md">
              <Typography
                variant={{ xs: "h3", md: "h1" }}
                sx={{
                  textAlign: "center",
                  fontWeight: 800,
                  textShadow: "0 0 20px rgba(0, 120, 212, 0.5)",
                  mb: 2,
                }}
              >
                {artist.name}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center", color: "#A1A1AA" }}>
                UK Drill Scene
              </Typography>
            </Container>
          </Box>
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* UK Music Charts */}
        <Box sx={{ mb: 6, px: { xs: 1, sm: 2 } }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <MusicNote sx={{ fontSize: 36, color: "#0078D4" }} />
            <Typography variant={{ xs: "h4", md: "h3" }} sx={{ fontWeight: 700 }}>
              UK Music Charts
            </Typography>
          </Stack>

          <Paper sx={{ p: 2, overflowX: "auto", whiteSpace: "nowrap" }}>
            {charts.map((song) => (
              <Box
                key={song.position}
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: { xs: "280px", sm: "350px", md: "420px" },
                  px: 2,
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0078D4" }}>
                    #{song.position} • {song.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#A1A1AA" }}>
                    {song.artist}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" sx={{ color: "#A1A1AA" }}>
                    {song.streams}
                  </Typography>
                  <Chip
                    label={song.trend}
                    size="small"
                    sx={{
                      bgcolor: "rgba(16,185,129,0.2)",
                      color: "#10B981",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Trending Artists */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <TrendingUp sx={{ fontSize: 36, color: "#8B5CF6" }} />
            <Typography variant={{ xs: "h4", md: "h3" }} sx={{ fontWeight: 700 }}>
              Trending Artists
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {trendingArtists.map((artist, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(139, 92, 246, 0.5)",
                    },
                  }}
                >
                  <CardMedia component="img" height="200" image={artist.image} alt={artist.name} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#A1A1AA", mb: 1 }}>
                      {artist.genre}
                    </Typography>
                    <Chip
                      label={`${artist.followers} followers`}
                      size="small"
                      sx={{ bgcolor: "rgba(0,120,212,0.2)", color: "#0078D4" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
