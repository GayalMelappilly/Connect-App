
export const logout = (req, res) => {
        try {
                console.log("LOG OUT")
                req.logout((err) => {
                        if (err) {
                                console.log(err)
                                res.send('LOGOUT FAILED')
                                return res.status(500).json({ message: 'Failed to logout. QQQ' });
                        }
                        // console.log("LOG OUT SUCCESS /// USER : ", req.user)
                        req.session.destroy((err) => {
                                if (err) {
                                        console.error('Error destroying session:', err);
                                        return res.status(500).json({ message: 'Failed to logout.' });
                                }
                                console.log("SESSION CLEARED SUCCESSFULLY. USER", req.session)
                                res.status(201).json({ message: 'Logout successful.' });
                        });
                });

        } catch (error) {
                console.log('Something went wrong.', error.message)
                res.status(500).json({ message: 'Something went wrong.' })
        }
}


export const signup = (req, res) => {
       try {
        if (!req.user) {
                console.log("SIGN IN FAILED")
                res.status(401).json({ message: 'Sign in failed' })
        }
        const userData = req.user;

        res.cookie('userData', JSON.stringify(userData));

        res.redirect(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URI : process.env.RENDER_URI}/signup`);
       } catch (error) {
        console.log("ERROR IN SIGNUP", error)
       }
}

export const failed = (req, res) => {
        res.status(401).json({ message: 'Sign in failed', user: null })
}