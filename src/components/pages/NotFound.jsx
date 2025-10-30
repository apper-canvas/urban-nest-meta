import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/10 to-secondary-light/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 px-4"
      >
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary"
            >
              <ApperIcon name="Home" size={80} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-error"
            >
              <ApperIcon name="AlertCircle" size={32} />
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-primary">404</h1>
          <h2 className="text-2xl font-display font-semibold text-gray-800">
            Property Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center gap-2">
              <ApperIcon name="Home" size={18} />
              Back to Home
            </Button>
          </Link>
          <Link to="/saved">
            <Button variant="outline" className="flex items-center gap-2">
              <ApperIcon name="Heart" size={18} />
              View Saved Properties
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;