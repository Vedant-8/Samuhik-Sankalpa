import React, { useEffect, useRef, useState } from "react";
import { Engine, Render, Runner, Bodies, Composite, Events, World } from "matter-js";
import { 
    Snackbar, 
    Alert, 
    Box, 
    TextField, 
    Button, 
    Container, 
    Grid, 
    ThemeProvider, 
    createTheme 
} from '@mui/material';

import BoltIcon from '@mui/icons-material/Bolt';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import ForestIcon from '@mui/icons-material/Forest';
import ParkIcon from '@mui/icons-material/Park';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PaidIcon from '@mui/icons-material/Paid';
import RedeemIcon from '@mui/icons-material/Redeem';
import RecyclingIcon from '@mui/icons-material/Recycling';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import projectsData from '../../../assets/projects.json';

export const PlinkoBoard = () => {
    const canvasRef = useRef(null);
    const [engine] = useState(Engine.create());
    const [donationAmount, setDonationAmount] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [donatedProject, setDonatedProject] = useState(null);

    // Pot configurations with new icons and colors
    const potConfigs = [
        { icon: <ForestIcon sx={{ color: '#fff' }} />, color: '#388e3c' },
        { icon: <EnergySavingsLeafIcon sx={{ color: '#fff' }} />, color: '#4caf50' },
        { icon: <WaterDropIcon sx={{ color: '#fff' }} />, color: '#2196f3' },
        { icon: <ParkIcon sx={{ color: '#fff' }} />, color: '#ff9800' },
        { icon: <PaidIcon sx={{ color: '#fff' }} />, color: '#d32f2f' },
        { icon: <RedeemIcon sx={{ color: '#fff' }} />, color: '#9c27b0' },
        { icon: <RecyclingIcon sx={{ color: '#fff' }} />, color: '#8bc34a' },
        { icon: <WaterDamageIcon sx={{ color: '#fff' }} />, color: '#03a9f4' },
        { icon: <CheckroomIcon sx={{ color: '#fff' }} />, color: '#ff5722' },
        { icon: <FastfoodIcon sx={{ color: '#fff' }} />, color: '#607d8b' },
    ];

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2e7d32',
            },
            background: {
                default: '#e8f5e9',
            },
        },
    });

    const selectRandomProject = () => {
        const randomIndex = Math.floor(Math.random() * projectsData.length);
        return projectsData[randomIndex];
    };

    useEffect(() => {
        engine.world.gravity.y = 2;

        const render = Render.create({
            element: canvasRef.current,
            engine: engine,
            options: {
                width: 800,
                height: 500,
                wireframes: false,
            },
        });

        const rows = 10;
        const pegsList = [];
        for (let row = 2; row < rows; row++) {
            const pegsInRow = row + 1;
            const spacing = 50;
            for (let i = 0; i < pegsInRow; i++) {
                const x = (i - pegsInRow / 2) * spacing + 450;
                const y = row * spacing - 69;
                const peg = Bodies.circle(x, y, 6, { 
                    isStatic: true, 
                    render: { fillStyle: '#fff' }, 
                    restitution: 0.8 
                });
                pegsList.push(peg);
            }
        }

        const scores = [];
        for (let pot = 0; pot < 9; pot++) {
            const x = 100 + pot * 70;
            const y = 420;
            const potBody = Bodies.rectangle(x, y, 65, 35, {
                isStatic: true,
                label: `point-${pot}`,
                render: {
                    fillStyle: potConfigs[pot].color,
                    strokeStyle: '#000',
                    lineWidth: 2,
                },
                restitution: 0.8,
            });
            scores.push(potBody);
        }

        const ground = Bodies.rectangle(400, 500, 800, 40, { isStatic: true });
        Composite.add(engine.world, [...pegsList, ...scores, ground]);

        Render.run(render);

        const runner = Runner.create();
        Runner.run(runner, engine);

        const handleBallLanding = (event) => {
            const pairs = event.pairs;
            for (const pair of pairs) {
                const { bodyA, bodyB } = pair;
                if (bodyB.label.includes('ball') && bodyA.label.includes('point')) {
                    const randomProject = selectRandomProject();
                    World.remove(engine.world, bodyB);
                    setDonatedProject(randomProject);
                    setOpenSnackbar(true);
                }
            }
        };

        Events.on(engine, 'collisionActive', handleBallLanding);

        return () => {
            World.clear(engine.world, true);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, [engine]);

    const addBall = () => {
        const amount = Number(donationAmount);
        if (amount <= 0) {
            alert("Please enter a valid donation amount");
            return;
        }

        const values = [300, 330, 360, 390, 440];
        const randomVal = Math.floor(Math.random() * values.length);
        const ball = Bodies.circle(values[randomVal], 20, 8, {
            restitution: 0.6,
            friction: 0.8,
            label: `ball-${amount}`,
            render: { fillStyle: '#fff' },
        });
        Composite.add(engine.world, ball);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" className="bg-green-200 min-h-screen p-4">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box 
                            className="bg-green-300 rounded-lg p-4"
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            <TextField 
                                fullWidth
                                type="number"
                                placeholder="Donation Amount"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="primary" 
                                onClick={addBall}
                            >
                                Drop Ball
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <div ref={canvasRef} style={{ width: '100%', height: 500 }}></div>
                    </Grid>
                </Grid>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={handleCloseSnackbar}
                >
                    <Alert 
                        onClose={handleCloseSnackbar} 
                        severity="success" 
                        sx={{ width: '100%' }}
                    >
                        {donatedProject && `You donated ₹${donationAmount} to ${donatedProject.name}!`}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};
