import React from 'react'
import TennisCard from '../../../components/GameDetailCardHeader/TennisCard'
import Button from '../../../components/Button'
import { COLORS } from '../../../utils/colors'

function TennisDetail({ gameInfo, isMobile, styles, handleRoute, selected }) {


    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
                style={{
                    ...styles.btt,
                    display: "flex",
                    flexDirection: "column",
                    // flex: 1,
                }}
            >
                <TennisCard data={gameInfo} />
            </div>
            {
                gameInfo?.status === "Finished" ? null
                    :
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {isMobile ? (
                            <div style={{ ...styles.mob }}>
                                <div style={{ width: "100%" }}>
                                    <Button
                                        text={`Bet ${gameInfo?.player[0]?.name} to Win`}
                                        propStyle={{
                                            width: "100%",
                                            backgroundColor:
                                                selected === gameInfo?.player[0]?.name
                                                    ? COLORS.primary
                                                    : COLORS.cream,
                                            color:
                                                selected === gameInfo?.player[0]?.name
                                                    ? COLORS.cream
                                                    : COLORS.primary,
                                        }}
                                        handlePress={() =>
                                            handleRoute(gameInfo?.player[0]?.name, "W1")
                                        }
                                    />
                                </div>
                                <div style={{ width: "100%", margin: "10px 0px" }}>
                                    <Button
                                        text={`Bet ${gameInfo?.player[1]?.name} to Win`}
                                        propStyle={{
                                            width: "100%",
                                            backgroundColor:
                                                selected === gameInfo?.player[1]?.name
                                                    ? COLORS.primary
                                                    : COLORS.cream,
                                            color:
                                                selected === gameInfo?.player[1]?.name
                                                    ? COLORS.cream
                                                    : COLORS.primary,
                                        }}
                                        // handlePress={() => navigate('/home')}
                                        handlePress={() =>
                                            handleRoute(gameInfo?.player[1]?.name, "W2")
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div style={{ ...styles.desk }}>
                                <div style={{ width: "100%" }}>
                                    <Button
                                        text={`Bet ${gameInfo?.player[0]?.name} to Win`}
                                        propStyle={{
                                            width: "90%",
                                            backgroundColor:
                                                selected === gameInfo?.player[0]?.name
                                                    ? COLORS.primary
                                                    : COLORS.cream,
                                            color:
                                                selected === gameInfo?.player[0]?.name
                                                    ? COLORS.cream
                                                    : COLORS.primary,
                                            fontSize: 12,
                                        }}
                                        handlePress={() =>
                                            handleRoute(gameInfo?.player[0]?.name, "W1")
                                        }
                                    />
                                </div>
                                <div style={{ width: "100%", margin: "10px 0px" }}>
                                    <Button
                                        text={`Bet ${gameInfo?.player[1]?.name} to Win`}
                                        propStyle={{
                                            width: "90%",
                                            backgroundColor:
                                                selected === gameInfo?.player[1]?.name
                                                    ? COLORS.primary
                                                    : COLORS.cream,
                                            color:
                                                selected === gameInfo?.player[1]?.name
                                                    ? COLORS.cream
                                                    : COLORS.primary,
                                            fontSize: 12,
                                        }}
                                        // handlePress={() => navigate('/home')}
                                        handlePress={() =>
                                            handleRoute(gameInfo?.player[1]?.name, "W2")
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    )
}

export default TennisDetail