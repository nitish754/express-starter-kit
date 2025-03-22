module.exports.hasPermission = (permission) => (req, res, next) => {
    const user = req.user;

    if (!user?.permissions) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!user.permissions.includes(permission)) {
        return res.status(403).json({ message: 'Insufficient Permission' });
    }

    next();
};

