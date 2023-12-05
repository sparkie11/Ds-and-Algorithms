import logging

logging.basicConfig(format="%(levelname)s - %(name)s -  %(message)s", level=logging.WARNING)
logging.getLogger("haystack").setLevel(logging.INFO)

from haystack.nodes import FARMReader

data_dir = "train_data"
reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=False)
# reader = FARMReader(model_name_or_path="deepset/bert-base-cased-squad2", use_gpu=False)
reader.train(data_dir=data_dir, train_filename="answers_4.json", use_gpu=False, n_epochs=5, save_dir="my_model_6")
reader.save(directory="my_model_6")
# new_reader = FARMReader(model_name_or_path="my_model_2")
