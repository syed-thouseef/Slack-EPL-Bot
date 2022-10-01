// ```` Title : English Premier League Slack Bot

// ```` Developed by: Thouseef Syed



// EPL API used:  https://www.chelseafc.com/en/api/fixtures/league-table?entryId=30EGwHPO9uwBCc75RQY6kg


//____________ Declare all the dependencies: ____________________________________________________________

require('dotenv').config()
const { App } = require('@slack/bolt');               // Slack Bolt Framework
const request = require('request');                       
const fs = require('fs')                              // To read and write files

// ____________ Configure the App with Tokens ___________________________________________________________
const app = new App({
    socketMode:true,
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    appToken:process.env.APP_TOKEN 
  });

let url = "https://www.chelseafc.com/en/api/fixtures/league-table?entryId=30EGwHPO9uwBCc75RQY6kg";

let options = {json: true};

//_________________________ This function is used to extract the Parameters via the API____________________


function getParams(){
    request(url, options, (error, res, body) => {

    
        if (error) {
            return  console.log(error)
        };
    
        if (!error && res.statusCode == 200) {

           
        };
    
        
        
        fs.writeFile('file.json', JSON.stringify(body), err => {
            if (err) {
                throw err
            }
            
        })
    

    
    });
    
    

} // End of function getParams

//_________________________ This function is to simplify the Parameters that are extracted via the API____________



function simplifyParams(){

    fs.readFile("file.json", function(err, json_data) {
      
        // Check for errors
        if (err) throw err;
       
        // Converting to JSON
        const body = JSON.parse(json_data);
        const data = body
        const table = data?.items?.[0]?.table
    
        if (table && table?.rows?.length > 0) {
            
    
            const rows = table.rows.map(row => ({
                Position: row?.position,
                Club: row?.clubName,
                P: row?.played,
                PTS: row?.points,
                W: row?.won,
                D: row?.drawn,
                L: row?.lost,
                GF: row?.goalDifference,
                RF: row?.recentForm?.length > 0 ? row.recentForm.join(' ') : '--',
                URL: row?.crestUrl
            }))
    

            fs.writeFile('simplified.json', JSON.stringify(rows), err => {
                if (err) {
                    throw err
                }
                
                console.log('Simplified API File is written successfully.')
            })
    

            
        } 
    

    
    });




} // end of function simplifyParams



// Run the two functions

getParams();
simplifyParams();

// _________________________ Start the Slack Bot ____________________________________________________
(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
  
    console.log('⚡️ Bolt app is running!');

    

  })();



// _________________________ Triggered when the user interacts with the Bot ____________________________

app.event('message', async ({ event, client }) => {


    var channelId = `${event.channel}`

    await new Promise(resolve => setTimeout(resolve, 2000));

     app.client.chat.postMessage({
         token:process.env.BOT_TOKEN, 
        channel: channelId,
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Hello, I'm EPL Bot. Please select your team for today: "
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Arsenal",
                                "emoji": false
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Manchester City",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Tottenham Hotspur",
                                "emoji": true
                            },
                            "value": "value-2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Brighton and Hove Albion",
                                "emoji": true
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Manchester United",
                                "emoji": true
                            },
                            "value": "value-4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Fulham",
                                "emoji": true
                            },
                            "value": "value-5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Chelsea",
                                "emoji": true
                            },
                            "value": "value-6"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Liverpool",
                                "emoji": true
                            },
                            "value": "value-7"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Brentford",
                                "emoji": true
                            },
                            "value": "value-8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Newcastle United",
                                "emoji": true
                            },
                            "value": "value-9"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Leeds United",
                                "emoji": true
                            },
                            "value": "value-10"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bournemouth",
                                "emoji": true
                            },
                            "value": "value-11"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Brentford",
                                "emoji": true
                            },
                            "value": "value-8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Everton",
                                "emoji": true
                            },
                            "value": "value-12"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Southampton",
                                "emoji": true
                            },
                            "value": "value-13"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Aston Villa",
                                "emoji": true
                            },
                            "value": "value-14"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Crystal Palace",
                                "emoji": true
                            },
                            "value": "value-15"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Wolverhampton Wanderers",
                                "emoji": true
                            },
                            "value": "value-16"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "West Ham United",
                                "emoji": true
                            },
                            "value": "value-17"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Nottingham Forest",
                                "emoji": true
                            },
                            "value": "value-18"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Leicester City",
                                "emoji": true
                            },
                            "value": "value-19"
                        },
                    ],
                    "action_id": "selected_team"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "⚽_Bringing you all the latest stats of EPL_"
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Premier League Points Table",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "points_table_button"
                }
            }
        ]
        })




}); // End Invoke message Block

//_________________________ Triggered when the user clicks the Points Table Button _________________________________________


app.action('points_table_button', async ({ action, ack, say,context,body}) => {

    tss = `${body.message.ts}`
    var channelId = `${body.container.channel_id}`

    app.client.chat.update({
        channel: channelId,
        token: process.env.BOT_TOKEN,
        ts: tss,
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "______________________👑 *ENGLISH PREMIER LEAGUE TABLE* 👑______________________"
                }
            }
        ]

    })


    token = process.env.BOT_TOKEN

    //  ______ The snippet below is used to run the Python script 'table_format.py' to post the Points table in a table format ______________

    const { spawn }  = require('child_process')
    const childPython = spawn('python', ['table_format.py',channelId,token]);
    
    childPython.stdout.on('data',(data) => {
        console.log(`stdout: ${data}`);
    });
    
    childPython.stderr.on('data',(data) => {
        console.error(`stderr: ${data}`);
    });
    
    childPython.on('close',(code) => {
        console.log(`child process exited with code: ${code}`);
    });
})

//______________________ Triggered when the user selects favorite team to obtain stats_______________________________________________________


app.action('selected_team', async ({ action, ack, say,context,body}) => {
    //await say("You selected Aresenal")

    
    block_id= `${action.block_id}`
    channelId = `${body.container.channel_id}`
    
    var ts= `${body.state.values[block_id].selected_team.selected_option.text.text}` // To Obtain selected in the body

    fs.readFile('simplified.json', (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        //_________________________________________________________________________
        
        var team_stats = {}
        
        for (var i = 0; i < arr.length; i++){
            var obj = arr[i];
            
            if(obj.Club == ts){
                team_stats = obj
                //console.log(team_dict)
            }
        }

        //console.log(team_stats[0].URL); 

        RF = `${team_stats.RF}`

        function replaceAll(string, search, replace) {
            return string.split(search).join(replace);
          }

        RF = replaceAll(RF,"W","🟩")
        RF = replaceAll(RF,"L","🟥")
        RF = replaceAll(RF,"D","🟦")
        


        app.client.chat.update({
            channel: channelId,
            token: process.env.BOT_TOKEN,
            ts: `${body.message.ts}`,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Team *\n\n${team_stats.Club} \n\n _Won_: 🟩  _Lost_: 🟥  _Drew_: 🟦`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": `${team_stats.URL}`,
                        "alt_text": "TEAM LOGO"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Games Played *: ${team_stats.P}`,
                            //"emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `_Points_ : ${team_stats.PTS}`,
                           // "emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `Wins : ${team_stats.W}`,
                         //   "emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `Draws : ${team_stats.D}`,
                          //  "emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `Losses : ${team_stats.L}`,
                           // "emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `Goal Difference : ${team_stats.GF}`,
                          //  "emoji": true
                        },
                        {
                            "type": "mrkdwn",
                            "text": `Recent Form : ${RF}`,
                          //  "emoji": true
                        }
                    ]
                },
                {
                    "type": "divider"
                }
            ]
            })
//___________________________________________________________________________________


        
    });



}
)

