"use client"

import { Button, Container, Grid, Icon, TextField } from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AlarmIcon from '@mui/icons-material/Alarm';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PixiExponentialLine from "@/components/PixiExponentialLine";


export default function Home() {
  const [name, setName] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [points, setPoints] = useState<number>(1000)
  const [pointsToBet, setPointsToBet] = useState<number>(0)
  const [multlipier, setMultlipier] = useState<number>(1.00)
  const [time, setTime] = useState<{ hours: number; minutes: number }>(getCurrentTime());
  const [value, setValue] = useState<number>(0);
  const [pointPosition, setPointPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function generateRandomNumber(): number {
    return +(Math.random() * (10 - 1) + 1).toFixed(2);
  }

  const handleStartBet = () => {
    setValue(generateRandomNumber)
  }

  useEffect(() => {
    const x = value * 10;
    const y = 600 - Math.exp(value) * 10; // scaling the point
    setPointPosition({ x, y });
  }, [value]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
  }


  const handleName = (event: ChangeEvent<HTMLInputElement> ) => {
    setName(event.target.value);
  };
  
  const handleAccept = () => {
    setIsGameStarted(!isGameStarted)
  }
  const handleDecrementPointsToBet = () => {
    if(pointsToBet === 0) return;
    setPointsToBet(prevState => prevState - 25)
  }
  const handleIncrementPointsToBet = () => {
    if(pointsToBet >= points) return;
    setPointsToBet(prevState => prevState + 25)
  }
  const handleDecrementMultiplier = () => {
    if(multlipier === 1.00) return;
    setMultlipier(prevState => prevState - 0.25)
  }
  const handleIncrementMultlipier = () => {
    if(multlipier >= 10.00) return;
    setMultlipier(prevState => prevState + 0.25)
  }
  return (
   <div className="py-10 px-20 h-screen bg-slate-900">
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="h-3/4">
  <Grid item xs={4} className="border rounded-xl bg-slate-800 border-slate-500">
  {!isGameStarted &&
  <Container className="h-full w-full flex flex-col items-center justify-evenly ">
     <h1 className="text-2xl">Please insert your name</h1>
     <TextField 
     label="Name" 
     variant="filled" 
     color="secondary"
     value={name}
     onChange={handleName}
     InputLabelProps={{
      sx: {
        color: 'white', // Label color
      },
    }}
     sx={{
      '& .MuiInputBase-input': {
        color: 'white', // Change this to your desired color
        backgroundColor: '#1f2329'
      }
    }}
     />
     <Button 
     color="secondary" 
     variant="contained" 
     size="large"
     disabled={!name}
     onClick={handleAccept}
     >
      Accept
    </Button>
  </Container>
}
{isGameStarted &&
    <Container className="h-full w-full flex flex-col">
      <Container className="flex justify-center gap-4">
          <Container className="up-down">
              <Container onClick={handleDecrementPointsToBet} className="flex max-w-16 min-h-12 justify-center items-center rounded-2xl border border-gray-600">
                <Icon fontSize="large" color="secondary" component={ArrowDropDownIcon}/>
              </Container>
              <Container className="flex flex-col justify-evenly items-center -mx-4">
                <span className="text-sm text-gray-500 ">Points</span>
                <Container className="flex justify-center max-w-20 min-w-20 bg-black py-2  rounded-2xl">
                  <span className="text-lg font-semibold">{pointsToBet}</span>
                </Container>
              </Container>
              <Container  onClick={handleIncrementPointsToBet}  className="flex max-w-16 min-h-12 justify-center items-center rounded-2xl border border-gray-600">
                <Icon fontSize="large" color="secondary" component={ArrowDropUpIcon}/>
              </Container>
          
          </Container>
          <Container className="up-down">
              <Container onClick={handleDecrementMultiplier} className="flex max-w-16 min-h-12 justify-center items-center rounded-2xl border border-gray-600">
                <Icon fontSize="large" color="secondary" component={ArrowDropDownIcon}/>
              </Container>
              <Container className="flex flex-col justify-evenly items-center -mx-4">
                <span className="text-sm text-gray-500 ">Multiplier</span>
                <Container className="flex justify-center max-w-20 min-w-20 bg-black py-2  rounded-2xl">
                  <span className="text-lg font-semibold">{multlipier}</span>
                </Container>
              
              </Container>
              <Container onClick={handleIncrementMultlipier}  className="flex max-w-16 min-h-12 justify-center items-center rounded-2xl border border-gray-600">
                <Icon fontSize="large" color="secondary" component={ArrowDropUpIcon}/>
              </Container>
          
          </Container>
          
      </Container>
    </Container>
}
</Grid>
  <Grid item xs={8} className="flex flex-col gap-4">
    <Container component='nav' className="flex justify-between">
   
      <div className="icon-board">
        <Icon component={MilitaryTechIcon} fontSize="large" color="secondary"></Icon>
        <span className="mx-auto text-xl font-bold">{isGameStarted ? points: ''}</span>
      </div>
      <div className="icon-board">
        <Icon component={SentimentSatisfiedAltIcon} fontSize="large" color="secondary"></Icon>
        <span className="mx-auto text-xl font-bold">{isGameStarted ? name : ''}</span>
      </div>
      <div className="icon-board">
        <Icon component={AlarmIcon} fontSize="large" color="secondary"></Icon>
        <span className="mx-auto text-xl font-bold">{time.hours.toString().padStart(2, '0')}:{time.minutes.toString().padStart(2, '0')}</span>
      </div>
   
    </Container>
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="relative">
        <PixiExponentialLine value={value} />
        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-black"></div>
        <div className="absolute left-0 bottom-0 h-full w-0.5 bg-black"></div>
        <div
          className="absolute w-2.5 h-2.5 bg-pink-500 rounded-full"
          style={{ left: `${pointPosition.x}px`, top: `${pointPosition.y}px` }}
        ></div>
      </div>
    </div>
  </Grid>
  </Grid>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={7}>
     Hola
  </Grid>
  <Grid item xs={5}>
    Bye Bye
  </Grid>
  </Grid>
   </div>
  );
}
