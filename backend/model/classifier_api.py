import os
import abc
import warnings
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn import preprocessing
from sklearn.externals import joblib


dirname = os.path.dirname(__file__)
warnings.filterwarnings(action='ignore', category=DeprecationWarning)


class EntityClassifier(abc.ABC):

    CSV_FILE = 'classes.csv'
    DUMP_FILE = 'EntityClassifier.pkl'
    TEST_OUTPUT = 'EntityClassifier.csv'

    le = None
    clf = None
    vectorizer = None

    def get_training_df(self):
        filepath = os.path.join(dirname, 
            os.path.join('data', 
                os.path.join('training', self.CSV_FILE)))
        self.training_df = pd.read_csv(filepath, encoding = "ISO-8859-1")
        return self.training_df

    @abc.abstractclassmethod
    def train(self, retrain=False):
        pass

    def detect_classifier(self):
        filepath = os.path.join(dirname, 
            os.path.join('data',
                os.path.join('models', self.DUMP_FILE)))
        return os.path.isfile(filepath)

    def dump_classifier(self, clf):
        filepath = os.path.join(dirname, 
            os.path.join('data',
                os.path.join('models', self.DUMP_FILE)))
        joblib.dump(clf, filepath)

    def load_classifier(self):
        filepath = os.path.join(dirname, 
            os.path.join('data',
                os.path.join('models', self.DUMP_FILE)))
        return joblib.load(filepath)

    def get_testing_df(self):
        filepath = os.path.join(dirname,
            os.path.join('data',
                os.path.join('testing', self.CSV_FILE)))
        self.testing_df = pd.read_csv(filepath, encoding = "ISO-8859-1")
        return self.testing_df

    def test(self):
        testing_df = self.get_testing_df()
        X_testing = self.vectorizer.transform(testing_df.body.tolist())
        target_labels = self.le.transform(testing_df.entity.tolist())
        return self.clf.score(X_testing, target_labels)

    def generate_test_output(self):
        testing_df = self.get_testing_df()
        X_testing = self.vectorizer.transform(testing_df.body.tolist())
        result = self.clf.predict(X_testing)
        output_labels = self.le.inverse_transform(result)
        testing_df['result'] = output_labels
        testing_df.to_csv(self.TEST_OUTPUT)

    def classify(self, messages):
        if not isinstance(messages, (list, tuple)): messages = (messages,)
        test = self.vectorizer.transform(messages)
        result = self.le.inverse_transform(self.clf.predict(test))
        return result


class EntitySMSClassifier(EntityClassifier):
    
    CSV_FILE = 'sms_classes.csv'
    DUMP_FILE = 'EntitySMSClassifier.pkl'
    TEST_OUTPUT = 'EntitySMSClassifier.csv'

    def train(self, retrain=False):
        
        # Load Training Data
        training_df = self.get_training_df()
        # Encode Labels
        self.le = preprocessing.LabelEncoder()
        self.le.fit(training_df.entity.unique().tolist())
        self.vectorizer = TfidfVectorizer(max_df=0.5, min_df=2, stop_words='english')

        # Create Training Data
        df = training_df.sample(frac=1)
        X_training = self.vectorizer.fit_transform(df.body.tolist())
        target_labels = self.le.transform(df.entity.tolist())

        # Load Classifier if exists and retrain is False
        if self.detect_classifier() and not retrain:
            self.clf = self.load_classifier()
            return

        # Train Classifier
        clf = MultinomialNB().fit(X_training, target_labels)
        self.dump_classifier(clf)
        self.clf = clf


class EntityEmailClassifier(EntityClassifier):

    CSV_FILE = 'email_classes.csv'
    DUMP_FILE = 'EntityEmailClassifier.pkl'
    TEST_OUTPUT = 'EntityEmailClassifier.csv'

    def train(self, retrain=False):

        # Load Training Data
        training_df = self.get_training_df()
        # Encode Labels
        self.le = preprocessing.LabelEncoder()
        self.le.fit(training_df.entity.unique().tolist())
        self.vectorizer = TfidfVectorizer(max_df=0.5, min_df=2, stop_words='english')

        # Create Training Data
        df = training_df.sample(frac=1)
        X_training = self.vectorizer.fit_transform(df.body.tolist())
        target_labels = self.le.transform(df.entity.tolist())

        # Load Classifier if exists and retrain is False
        if self.detect_classifier() and not retrain:
            self.clf = self.load_classifier()
            return

        # Train Classifier
        clf = MultinomialNB().fit(X_training, target_labels)
        self.dump_classifier(clf)
        self.clf = clf

